import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  getDiagnostic,
  resetDiagnosticState,
} from "../../features/diagnoses/getDiagnosticSlice.js";
import {
  submitResults,
  resetSubmitResultsState,
} from "../../features/diagnoses/submitResultsSlice.js";

import "../../styles/selector.css";

const MySwal = withReactContent(Swal);

const Diagnostic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation("Diagnostic");

  const { diagnostic } = useSelector((state) => state.diagnostic);

  const [diagnosticStarted, setDiagnosticStarted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (diagnostic?.questions && diagnostic?.questions.length > 0) {
      setAnswers(Array(diagnostic.questions.length).fill(2));
    }
  }, [diagnostic?.questions]);

  useEffect(() => {
    setHasInteracted(false);
  }, [diagnostic?.page]);

  const handleStartDiagnostic = () => {
    dispatch(resetDiagnosticState());
    const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");
    dispatch(getDiagnostic({ language: i18n.language, token: token }))
      .then((res) => {
        if (res.payload?.httpCode === 201) {
          setDiagnosticStarted(true);
        } else if (res.payload?.httpCode === 409) {
          MySwal.fire({
            title: t("alert.finished.title"),
            icon: "info",
            text: t("alert.finished.text"),
          });
          navigate("/profile");
        } else if (res.payload?.httpCode === 206 || res.payload?.httpCode === 200) {
          setDiagnosticStarted(true);
        }
      })
      .catch((error) => {
        MySwal.fire({
          title: t("alert.error.title"),
          text: error.message || t("alert.error.text"),
          icon: "error",
        });
        navigate("/profile");
      });
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);

    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  const allAnswered = true;

  const handleContinue = async () => {
    if (!allAnswered) return;

    const token = sessionStorage.getItem("userToken") ?? localStorage.getItem("userToken");

    try {
      const submitRes = await dispatch(submitResults({ token, responses: answers })).unwrap();

      if (submitRes.httpCode === 409) {
        MySwal.fire({
          title: t("alert.finished.title"),
          icon: "info",
          text: t("alert.finished.text"),
        });
        return navigate("/profile");
      }

      const diagnosisRes = await dispatch(
        getDiagnostic({ language: i18n.language, token })
      ).unwrap();

      if (diagnosisRes.httpCode === 409) {
        MySwal.fire({
          title: t("alert.finished.title"),
          icon: "info",
          text: t("alert.finished.text"),
        });
        navigate("/profile");
      }
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    } catch (error) {
      MySwal.fire({
        title: t("alert.error.title"),
        text: error.message || t("alert.error.text"),
        icon: "error",
      });
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <Helmet>
        <title>{t("meta_title")}</title>
      </Helmet>

      <div className="flex flex-col max-w-3xl">
        {!diagnosticStarted && (
          <div className="space-y-4 flex flex-col items-center">
            <h1 className="text-4xl lg:text-6xl font-semibold mb-4 mt-10 text-center">
              {t("title")}
            </h1>

            <p className="text-xl lg:text-2xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
              {t("description.0")}
              <span className="font-bold">{t("description.1")}</span>
              {t("description.2")}
              <span className="font-bold">{t("description.3")}</span>
            </p>

            <p className="text-lg lg:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto">
              {t("description.4")}
            </p>
            <button
              className="m-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-3xl"
              onClick={handleStartDiagnostic}
            >
              {t("start_button")}
            </button>
          </div>
        )}

        {diagnosticStarted && (
          <div className="mt-10">
            <h2 className="text-center text-3xl lg:text-5xl text-zinc-700 dark:text-zinc-300 max-w-xl mx-auto font-semibold mb-6">
              {t("page")} {diagnostic?.page}
            </h2>

            {diagnostic?.questions?.length > 0 && (
              <div className="space-y-6 border-t-2 border-indigo-500 border-opacity-50">
                {diagnostic.questions.map((question, index) => (
                  <div className="p-10 border-b-2 border-indigo-500 border-opacity-50" key={index}>
                    <p className="font-medium text-xl lg:text-2xl mb-4">
                      {index + 1}.{" "}
                      {question.content_es || question.content_en || question.content_pt}
                    </p>

                    {/* Contenedor relativo para slider + etiquetas */}
                    <div className="relative w-full" style={{ height: "60px" }}>
                      {/* El slider en posición absoluta, centrado verticalmente */}
                      <input
                        type="range"
                        min="0"
                        max="4"
                        step="1"
                        value={answers[index]}
                        onChange={(e) => handleAnswerChange(index, Number(e.target.value))}
                        className="rangeProgress absolute top-1/2 left-0 transform -translate-y-1/2 w-full"
                      />

                      {/* Etiquetas (pointer-events-none para que no interfieran con el slider) */}
                      <div className="pointer-events-none select-none text-xs text-zinc-400">
                        {[
                          t("answers.strongly_disagree"),
                          t("answers.disagree"),
                          t("answers.neutral"),
                          t("answers.agree"),
                          t("answers.strongly_agree"),
                        ].map((label, i) => (
                          <span
                            key={i}
                            className="absolute"
                            style={{
                              left: `${(i / 4) * 100}%`, // 0%, 25%, 50%, 75%, 100%
                              top: "40px", // Ajusta la distancia vertical según tu diseño
                              transform: "translateX(-50%)",
                            }}
                          >
                            {label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Botón Continuar */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleContinue}
                disabled={!allAnswered || !hasInteracted}
                className={`${
                  !allAnswered || !hasInteracted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-500 hover:bg-indigo-600"
                } text-white px-6 py-2 rounded-3xl`}
              >
                {diagnostic?.page === 30 ? t("finish_button") : t("continue_button")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diagnostic;

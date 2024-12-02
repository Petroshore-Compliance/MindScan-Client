import { motion } from 'framer-motion';

const nodes = [
  { id: 1, x: '50%', y: '30%' },
  { id: 2, x: '70%', y: '20%' },
  { id: 3, x: '80%', y: '30%' },
  { id: 4, x: '75%', y: '45%' },
  { id: 5, x: '50%', y: '70%' },
  { id: 6, x: '25%', y: '45%' },
  { id: 7, x: '20%', y: '30%' },
  { id: 8, x: '30%', y: '20%' }
];

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
  { from: 6, to: 7 },
  { from: 7, to: 8 },
  { from: 8, to: 1 }
];

const NeuralNetworkAnimation = () => {
  return (
    <svg
      className="inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Renderizar conexiones */}
      {connections.map((conn, index) => {
        const fromNode = nodes.find(node => node.id === conn.from);
        const toNode = nodes.find(node => node.id === conn.to);

        return (
          <motion.line
            key={`conn-${index}`}
            x1={fromNode.x}
            y1={fromNode.y}
            x2={toNode.x}
            y2={toNode.y}
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              delay: index * 0.8,
            }}
          />
        );
      })}

      {/* Renderizar nodos */}
      {nodes.map((node) => (
        <motion.circle
          key={`node-${node.id}`}
          cx={node.x}
          cy={node.y}
          r="5"
          fill="#4F46E5"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: node.id * 0.6,
          }}
          whileHover={{ scale: 1.2 }}
        />
      ))}
    </svg>
  );
};

export default NeuralNetworkAnimation;
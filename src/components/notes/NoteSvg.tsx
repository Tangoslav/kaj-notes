import React from 'react';

const lines = [
    { x1: 30, y1: 20, x2: 70, y2: 20 },
    { x1: 10, y1: 40, x2: 90, y2: 40 },
    { x1: 10, y1: 50, x2: 90, y2: 50 },
    { x1: 10, y1: 60, x2: 50, y2: 60 },
    { x1: 10, y1: 70, x2: 50, y2: 70 },
    { x1: 10, y1: 80, x2: 50, y2: 80 },
    { x1: 10, y1: 90, x2: 50, y2: 90 },
];

const NoteSvg: React.FC = () => {
    return (
        <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-50 h-50 m-5 note-svg cursor-pointer"
        >
            {/* Main note rectangle with rounded corners */}
            <rect
                x="0.5"
                y="0.5"
                width="99"
                height="99"
                rx="20"
                ry="20"
                fill="aliceblue"
                stroke="black"
                strokeWidth="0.5"
            />
            {/* Folded corner polygon */}
            <polygon
                points="100,60 60,100 60,60"
                fill="aliceblue"
                stroke="black"
                strokeWidth="0.5"
            />
            {/* Hide the bottom corner of rectangle */}
            <polygon
                points="100,60 100,100 60,100"
                fill="whitesmoke"
                strokeWidth="0.5"
            />
            {/* Note lines */}
            {lines.map((line, index) => (
                <line
                    key={index}
                    className="note-line"
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="gray"
                />
            ))}
        </svg>
    );
};

export default NoteSvg;

import React from 'react';

interface Step {
  title: string;
  description: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            {/* <div className={`w-8 h-8 rounded-full border-2 ${
              index < currentStep ? 'bg-green-500 border-green-500' : 'border-gray-300'
            } flex items-center justify-center`}>
              {index < currentStep ? (
                <span className="text-white">{index + 1}</span>
              ) : (
                <span className="text-gray-500">{index + 1}</span>
              )}
            </div> */}
            <h3 className={`mt-2 text-sm ${index === currentStep ? 'font-bold' : 'text-gray-500'} ${index < currentStep ? 'text-green-500' : ''} `}>
              {step.title}
            </h3>
            <p className={`text-xs ${index === currentStep ? 'font-semibold' : 'text-gray-400'}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
      {/* Progress Bar */}
      <div className="relative w-full h-1 bg-zinc-700">
        <div
          className={`absolute top-0 left-0 h-full bg-green-500`}
          style={{ width: `${((currentStep+1) / (steps.length)) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Stepper;
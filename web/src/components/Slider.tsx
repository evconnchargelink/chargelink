type SliderProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  max: number;
  step: number;
};

const Slider = ({ value, onValueChange, max, step }: SliderProps) => {
  return (
    <div>
      <input
        type="range"
        value={value[0]}
        min={0}
        max={max}
        step={step}
        onChange={(e) => onValueChange([Number(e.target.value)])}
        className="w-full custom-slider"
      />
    </div>
  );
};

export default Slider;

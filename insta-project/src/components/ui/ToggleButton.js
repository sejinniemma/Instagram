export default function ToggleButton({ toggled, onToggle, onIcon, offIcon }) {
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
}

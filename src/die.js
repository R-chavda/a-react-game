export default function die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <button onClick={props.hold} style={styles}>
      {props.value}
    </button>
  );
}

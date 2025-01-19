import CubeCanvas from "../components/CubeCanvas";
import Qoute from "../components/Qoute";
import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div>
      <Welcome />
      <Qoute />
      <div className="h-96">
        <CubeCanvas />
      </div>
    </div>
  );
};

export default Home;

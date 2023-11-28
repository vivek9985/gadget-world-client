import { Button } from "@mui/material";

const Banner = () => {
  return (
    <section className="py-20 md:py-40 lg:py-56 lap">
      <div className="w-10/12 mx-auto">
        <h2 className="text-4xl md:text-6xl lg:text-7xl">
          Latest Tech Products
        </h2>
        <p className="mt-6 font-medium text-lg">
          Get your desired product from{" "}
          <span className="text-green-500 font-medium">Gadget World</span>.
        </p>
        <div className="">
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "black",
              mt: 3,
              width: 160,
              height: 45,
            }}
          >
            Discover More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;

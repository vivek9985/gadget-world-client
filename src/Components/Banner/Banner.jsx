import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../../js/animation";

const Banner = () => {
  return (
    <section className="py-20 sm:py-32 md:py-40 lg:py-60 lap overflow-hidden">
      <div className="w-10/12 mx-auto">
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-black latest">
            Latest Tech <span className="product">Products</span>
          </h2>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0 }}
        >
          <p className="mt-4 md:mt-6 font-medium text-lg md:text-xl">
            Showcase your product in{" "}
            <span className="text-cyan-500 font-medium">Gadget World</span>.
          </p>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.6)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0 }}
        >
          <Button
            variant="contained"
            sx={{
              color: "white",
              bgcolor: "black",
              mt: 3,
              width: 160,
              height: 43,
              pt: 1
            }}
          >
            Discover More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;

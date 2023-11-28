import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { TiArrowDownThick } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      // , {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("token")}`,
      //     },
      //   }
      return res.data;
    },
  });
  const firstPage = products.slice(0, 20);
  const secondPage = products.slice(20, 40);
  const thirdPage = products.slice(41, 60);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <h2 className="text-center text-xl sm:text-3xl mt-20">PRODUCTS</h2>
      <div className="h-0.5 w-[10%] bg-gray-300 mx-auto rounded-full mt-2"></div>
      <div className="h-0.5 w-[13%] bg-gray-300 mx-auto rounded-full mt-1 mb-2"></div>

      <div className="w-10/12 mx-auto">
        <div ref={sliderRef} className="keen-slider">
          <div className="keen-slider__slide">
            <section className="w-full">
              <div className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
                  <div className="grid gap-8 mb-2 sm:grid-cols-2 xl:grid-cols-3 overflow-hidden">
                    {firstPage.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-xl border"
                      >
                        <div className="">
                          <div className="flex items-center justify-center">
                            <img
                              className="rounded-xl w-[200px] h-[180px]"
                              src={item.image}
                              alt="image"
                            />
                          </div>
                        </div>

                        <div className="p-7">
                          <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-500 mb-4">
                            <Link to={`/products/${item._id}`}>
                              {item.productName}
                            </Link>
                          </h3>
                          <div className="flex items-start flex-wrap mt-1 mb-2 h-[85px] overflow-scroll">
                            <span className="text-lg font-medium mr-1">
                              Tags :{" "}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[0]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[1]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[2]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[3]}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-[#0000002f] rounded-lg">
                            <button
                              //   onClick={voteUpHandler}
                              className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                            >
                              <span>Voteup</span>
                              <TiArrowDownThick className="rotate-180 text-base ml-1" />
                            </button>
                            <h3 className="px-5 py-1.5">0</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="keen-slider__slide">
            <section className="w-full">
              <div className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                  <div className="grid gap-8 mb-2 sm:grid-cols-2 xl:grid-cols-3 overflow-hidden">
                    {secondPage.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-xl border"
                      >
                        <div className="">
                          <div className="flex items-center justify-center">
                            <img
                              className="rounded-xl w-[200px] h-[180px]"
                              src={item.image}
                              alt="image"
                            />
                          </div>
                        </div>

                        <div className="p-7">
                          <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-500 mb-4">
                            <Link to={`/products/${item._id}`}>
                              {item.productName}
                            </Link>
                          </h3>
                          <div className="flex items-start flex-wrap mt-1 mb-2 h-[85px] overflow-scroll">
                            <span className="text-lg font-medium mr-1">
                              Tags :{" "}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[0]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[1]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[2]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[3]}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-[#0000002f] rounded-lg">
                            <button
                              //   onClick={voteUpHandler}
                              className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                            >
                              <span>Voteup</span>
                              <TiArrowDownThick className="rotate-180 text-base ml-1" />
                            </button>
                            <h3 className="px-5 py-1.5">0</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="keen-slider__slide">
            <section className="w-full">
              <div className="bg-white">
                <div className="py-8 px-4 mx-auto max-w-screen-xl">
                  <div className="grid gap-8 mb-2 sm:grid-cols-2 xl:grid-cols-3 overflow-hidden">
                    {thirdPage.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-xl border"
                      >
                        <div className="">
                          <div className="flex items-center justify-center">
                            <img
                              className="rounded-xl w-[200px] h-[180px]"
                              src={item.image}
                              alt="image"
                            />
                          </div>
                        </div>

                        <div className="p-7">
                          <h3 className="text-xl font-bold tracking-tight text-gray-900 hover:text-blue-500 mb-4">
                            <Link to={`/products/${item._id}`}>
                              {item.productName}
                            </Link>
                          </h3>
                          <div className="flex items-start flex-wrap mt-1 mb-2 h-[85px] overflow-scroll">
                            <span className="text-lg font-medium mr-1">
                              Tags :{" "}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[0]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[1]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[2]}
                            </span>
                            <span className="bg-[#00000023] text-gray-500 text-xs px-3 pt-[2px] pb-[3px] rounded-full m-1">
                              {item.allTags[3]}
                            </span>
                          </div>
                          <div className="flex items-center justify-between bg-[#0000002f] rounded-lg">
                            <button
                              //   onClick={voteUpHandler}
                              className="flex items-center text-sm bg-black text-white px-3 py-2 rounded-md hover:scale-110 transition-all duration-300"
                            >
                              <span>Voteup</span>
                              <TiArrowDownThick className="rotate-180 text-base ml-1" />
                            </button>
                            <h3 className="px-5 py-1.5">0</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div
          ref={thumbnailRef}
          className="keen-slider thumbnail text-center mb-32 flex items-center justify-center"
        >
          <div className="keen-slider__slide number-slide1">1</div>
          <div className="keen-slider__slide number-slide2">2</div>
          <div className="keen-slider__slide number-slide3">3</div>
        </div>
      </div>
      {/* <Slider></Slider> */}
    </>
  );
};

export default Products;

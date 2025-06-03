import CommenLayout from "@components/layout/CommenLayout";
export const metadata = {
  title: 'Home',
  description: 'Login or sign up to access the Restaurant app.',
};

export default function Home() {
  return (
    <CommenLayout>
      <section>
        <div className="wrapper">
          <div className="container">
            <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
              {/* Background Video */}
              <video className="absolute top-0 left-0 w-full h-full object-cover z-0" autoPlay muted loop>
                <source src="/videos/home/homepagemainvideo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay for optional darkening effect */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>

              {/* Input Fields on top of video */}
              <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
                <h1 className="text-white mb-6">Find Your Favorite Food</h1>
                <div className="flex w-full max-w-2xl space-x-4 p-4 shadow-lg bg-[#ffffff4d] backdrop-blur-md rounded-md">
                  <input type="text" placeholder="Select place" className="flex-1 input2" />
                  <input type="text" placeholder="Enter food or restaurant name" className="flex-1 input2" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </CommenLayout>
  );
}

import heroImg  from "../images/heroImg.jpg";

export default function Hero( {onButtonClick}) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-16 py-20 grid grid-cols-2 items-center gap-10">
        
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl font-bold leading-tight text-dark">
            Exchange{" "}
            <span className="text-teal text-blue-400">Your Skills</span>
            <br />
            With SkillSwap!
          </h1>

          <p className="mt-6 text-gray-500 max-w-md leading-relaxed">
            You have a skill right? Maybe you’re good taking pictures, or you can
            even teach some language. Exchange that knowledge! SkillSwap is here
            for establishing that connection. Make your match in person or
            online.
          </p>

          <button className="mt-8 bg-yellow-500 px-8 py-3 rounded-md font-semibold text-dark hover:opacity-90 transition" onClick={onButtonClick}>
            Find a Skill Partner
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-end">
          <img
            src={heroImg}
            alt="Skill exchange illustration"
            className="w-[420px]"
          />
        </div>

      </div>
    </section>
  );
}

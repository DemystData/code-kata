import { Button } from '@/components/ui/button';
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 md:p-12 bg-gradient-to-b from-slate-900 to-slate-800 justify-center">
      <div className="text-white w-full lg:w-[50%]">
        <h1 className="text-5xl md:text-6xl font-semibold leading-tight md:leading-tight mb-3 md:mb-6">
          <div className="mb-2 text-xl">Hi there,</div>Welcome to <span className="gradient-text">Loanr!</span>
        </h1>
        <p className="text-xl font-normal md:text-3xl mb-3 md:mb-6 text-slate-300">
          Say goodbye to loan application rejections.
        </p>
        <p className="text-lg md:text-xl mb-2 font-light text-gray-400">
          Loanr empowers you with smart insights to increase your loan approval chances. Our advanced assessment
          analyzes your business and provides a tailored success prediction for your loan application.
        </p>
        <Button className="mt-6" size="lg">
          Get Started
        </Button>
      </div>
    </main>
  );
}

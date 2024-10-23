import { CircleArrowRight, Code, Download, Workflow } from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const LandingPage = () => {
	const { login, register } = useKindeAuth();
	return (
		<>
			<div className="flex justify-between items-center mx-12">
				<div className="flex justify-start items-center m-4">
					<img src="../public/logo.png" alt="logoimg" className="w-16 h-16" />
					<h1 className="text-[#FF1947] font-bold text-2xl">ThinkDraw</h1>
				</div>
				<div>
					<button
						type="button"
						onClick={login}
						className="border-2 border-[#FF1947] rounded-md w-16 h-8 font-bold hover:bg-[#FF1947] hover:text-[#000] text-black"
					>
						Login
					</button>
				</div>
			</div>

			<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter leading-snug sm:text-4xl md:text-5xl lg:text-6xl/none ">
								Create Flow Diagrams <br /> & <br />
								<span className="text-[#FF1947]">Generate Pseudocode</span>
							</h1>
							<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
								Design your flow diagrams visually and automatically generate
								downloadable pseudocode.
							</p>
						</div>
						<div className="flex items-center justify-center gap-2">
							<button
								onClick={register}
								type="button"
								className="border-2 border-[#FF1947] rounded-md font-bold p-2 text-[#000] hover:bg-[#FF1947] hover:text-[#000] transition duration-300 ease-in-out flex gap-1 items-center"
							>
								Get Started <CircleArrowRight />
							</button>
							<button
								type="button"
								className="border-2 border-[#000] rounded-md font-bold p-2 text-[#fff] bg-[#000] hover:text-[#FF1947] transition duration-300 ease-in-out flex gap-1 items-center"
							>
								Learn More <CircleArrowRight />
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
						Features
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<div className="flex flex-col items-center space-y-4 p-6 border-2 border-gray-500 rounded-md bg-white">
								<Workflow className="h-12 w-12 text-primary text-[#FF1947]" />
								<h3 className="text-2xl font-bold text-center">
									Visual Flow Diagrams
								</h3>
								<p className="text-center text-gray-500">
									Create complex flow diagrams with customizable nodes and
									edges.
								</p>
							</div>
						</div>
						<div>
							<div className="flex flex-col items-center space-y-4 p-6 border-2 border-gray-500 rounded-md bg-white ">
								<Code className="h-12 w-12 text-primary text-[#FF1947]" />
								<h3 className="text-2xl font-bold text-center">
									Automatic Pseudocode
								</h3>
								<p className="text-center text-gray-500 dark:text-gray-400">
									Generate pseudocode directly from your flow diagram with a
									click of a button.
								</p>
							</div>
						</div>
						<div className="">
							<div className="flex flex-col items-center space-y-4 p-6 border-2 border-gray-500 rounded-md bg-white">
								<Download className="h-12 w-12 text-primary text-[#FF1947]" />
								<h3 className="text-2xl font-bold text-center">Easy Export</h3>
								<p className="text-center text-gray-500 dark:text-gray-400">
									Download your pseudocode and diagrams with a single click.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
						How It Works
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div className="space-y-4">
							<h3 className="text-2xl font-bold">1. Design Your Flow</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Use our intuitive interface to create nodes and connect them
								with edges.
							</p>
							<h3 className="text-2xl font-bold">2. Add Your Logic</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Write your logic directly in the nodes and edges of your
								diagram.
							</p>
							<h3 className="text-2xl font-bold">3. Generate & Download</h3>
							<p className="text-gray-500 dark:text-gray-400">
								With a single click, generate pseudocode and download it
								instantly.
							</p>
						</div>
						<div className="relative h-[400px] w-full">
							<video
								autoPlay
								loop
								muted
								playsInline
								className="rounded-lg"
								style={{ height: "400px", width: "100%", objectFit: "contain" }}
							>
								<source src="../public/01.mp4" type="video/mp4" />
							</video>
						</div>
					</div>
				</div>
			</section>
			<section
				id="testimonials"
				className="w-full py-12 md:py-24 lg:py-32 bg-gray-100"
			>
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
						What Our Users Say
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{[
							{
								name: "Alex Johnson",
								role: "Software Engineer",
								content:
									"ThinkDraw has revolutionized how I plan my algorithms. It's intuitive and saves me so much time!",
							},
							{
								name: "Samantha Lee",
								role: "CS Student",
								content:
									"As a student, ThinkDraw helps me visualize complex algorithms and understand them better. It's a game-changer!",
							},
							{
								name: "Michael Chen",
								role: "Tech Lead",
								content:
									"My team's productivity has skyrocketed since we started using ThinkDraw for our planning sessions.",
							},
						].map((testimonial, index) => (
							<div key={index}>
								<div className="p-6 bg-white rounded-md">
									<p className="mb-4 italic">"{testimonial.content}"</p>
									<p className="font-semibold">{testimonial.name}</p>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{testimonial.role}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
								Ready to Streamline Your Workflow?
							</h2>
							<p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
								Join thousands of developers who are already using ThinkDraw to
								create better, faster, and more efficient code.
							</p>
						</div>
						<button
							onClick={register}
							type="button"
							className="flex justify-center items-center gap-1 border-2 border-black text-[#FF1947] hover:bg-[#000] hover:text-white px-4 py-2 rounded-md transition-all duration-300 font-semibold"
							size="lg"
						>
							Get Started Now
							<CircleArrowRight />
						</button>
					</div>
				</div>
			</section>
			<footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
				<p className="text-xs text-gray-500 dark:text-gray-400">
					© 2024 ThinkDraw. All rights reserved.
				</p>
				<nav className="sm:ml-auto flex gap-4 sm:gap-6">
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Terms of Service
					</a>
					<a className="text-xs hover:underline underline-offset-4" href="#">
						Privacy
					</a>
				</nav>
			</footer>
		</>
	);
};

export default LandingPage;

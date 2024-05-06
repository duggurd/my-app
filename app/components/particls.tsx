"use client";

import { match } from "assert";
import React, { useRef, useEffect, useState } from "react";
// import { useMousePosition } from "util";
import delay from 'delay'

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
}

export default function Particles({
	className = "",
	quantity = 1,
	staticity = 50,
	ease = 50,
	refresh = false,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<any[]>([]);
	// const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	// useEffect(() => {
	// 	onMouseMove();
	// }, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		// targetAlpha: number;
		dx: number;
		dy: number;
        lifetime: number;
		// magnetism: number;
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const circleParams = (): Circle => {
		const x = canvasSize.current.w + Math.random()*50;
		const y = 0 + Math.random()*50;
		const translateX = 0;
		const translateY = 0;
		const size = Math.floor(Math.random() * 2) + 0.5;
		const alpha = parseFloat((Math.random() * 0.8 + 0.1).toFixed(1));
		// const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
		const dx = -4  + (Math.random() - 0.7);
		const dy = 4 + (Math.random() - 0.3);// (Math.random() - 0.1) * 1;
		// const magnetism = 0.1 + Math.random() * 4;
        const lifetime = 0;
		
        return {
			x,
			y,
			translateX,
			translateY,
			size,
			alpha,
			// targetAlpha,
			dx,
			dy,
            lifetime
			// magnetism,
		};
	};

	const drawCircle = async (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, dx, dy, translateX, translateY, size, alpha, lifetime } = circle;
            context.current.translate(translateX, translateY);
            context.current.beginPath();
            context.current.arc(x, y, size, 0, 2 * Math.PI);
            context.current.fillStyle = "rgba(255, 255, 255, 0)";
            context.current.fill();
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
            
            context.current.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            context.current.lineWidth = 0.5;

            context.current.beginPath();
            context.current.moveTo( x, y );
            context.current.lineTo( x-(dx*10), y-(dy*10) );

            context.current.lineTo( x-(dx*20), y-(dy*20*lifetime));

            // context.current.lineTo( x-(dx*15)*lifetime/5, y-(dy*15)*lifetime/5 );
            
            // context.current.lineTo( x-(dx*20)*lifetime/5, y-(dy*20)*lifetime/5 );

            // context.current.lineTo( x-(dx*30)*lifetime/5, y-(dy*30) *lifetime/5);

            context.current.stroke();


            if (!update) {
                circles.current.push(circle);
            }
        }
        await delay(3000);
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = async () => {
		clearContext();

		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
            if (circles.current.length <= quantity) {
                const circle = circleParams();
			    await drawCircle(circle);
            }
			
		}
	}

	const animate = () => {
		clearContext();
		circles.current.forEach((circle: Circle, i: number) => {
            console.log(circle.lifetime)
            
			// Handle the alpha value
			// const edge = [
			// 	circle.x + circle.translateX - circle.size, // distance from left edge
			// 	canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
			// 	circle.y + circle.translateY - circle.size, // distance from top edge
			// 	canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
			// ];
			// const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			// const remapClosestEdge = parseFloat(
			// 	remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			// );
			// if (remapClosestEdge > 1) {
			// 	circle.alpha += 0.02;
			// 	if (circle.alpha > circle.targetAlpha) {
			// 		circle.alpha = circle.targetAlpha;
			// 	}
			// } else {
			// 	circle.alpha = circle.targetAlpha * remapClosestEdge;
			// }
			circle.x += circle.dx;
			circle.y += circle.dy;
			// circle.translateX +=
			// 	(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
			// 	ease;
			// circle.translateY +=
			// 	(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
			// 	ease;
			// circle gets out of the canvas
			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.current.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.current.h + circle.size
			) {
				// remove the circle from the array
                circles.current.splice(i, 1);
				// create a new circle
				const newCircle = circleParams();
				drawCircle(newCircle);
				// update the circle position
			} else {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha,
                        lifetime: circle.lifetime + 1
					},
					true,
				);
			}
		});
		window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
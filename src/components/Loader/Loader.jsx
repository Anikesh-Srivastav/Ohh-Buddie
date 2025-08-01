import './Loader.css'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ReactLenis from 'lenis/react'

gsap.registerPlugin(ScrollTrigger)

const Loader = () => {

  const [currentCycle, setCurrentCycle] = useState(0)
  
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const handleContainerRef = useRef(null)
  const handRef = useRef(null)
  const handImageRef = useRef(null)
  const introRef = useRef(null)
  const h1ElementRef = useRef(null)
  const introCopyRef = useRef(null)
  const websiteContainerRef = useRef(null)

  const taglines = [
    <h1 key={0}><span>It's time to</span> take your food business digital</h1>,
    <h1 key={1}><span>Manage, grow,</span> and serve — all in one place</h1>,
    <h1 key={2}><span>From street stalls</span> to fine dining — we’ve got you covered</h1>,
    <h1 key={3}>Welcome to <span>Abhiko</span> — where food meets smart business</h1>,
    <h1 key={4}><span>Serve better,</span> scale faster, connect deeper</h1>
  ]
  

  useGSAP(() => {
    const pinnedHeight = window.innerHeight * 8;
    let lastCycle = -1;
    let imageReveal = false;
  
      ScrollTrigger.create({
      trigger: stickyRef.current,
      start: 'top top',
      end: `+=${pinnedHeight}`,
      pin: true,
      pinSpacing: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        const totalRotation = -90 + progress * 2160
  
        gsap.set(handleContainerRef.current, { rotateZ: totalRotation })
  
        const newCycle = Math.floor((totalRotation + 90) / 360)
        if (newCycle !== lastCycle && newCycle >= 0 && newCycle < taglines.length) {
          lastCycle = newCycle
          setCurrentCycle(newCycle)
        }
  
        // Image reveals on cycle 3 (4th tagline: "Welcome to Ohh! Buddie")
        if(newCycle === 3 && !imageReveal) {
          gsap.to(handImageRef.current, {opacity: 1, duration: 0.3});
          gsap.to(introCopyRef.current.querySelectorAll('p'), {
            x: 0,
            duration: 0.5,
            stagger: 0.1,
          })
          imageReveal = true;
        } else if(newCycle !== 3 && imageReveal && newCycle < 4) {
          // Only hide if we're not on cycle 3 and haven't reached cycle 4 yet
          gsap.to(handImageRef.current, {opacity: 0, duration: 0.3});
          gsap.to(introCopyRef.current.querySelectorAll('p'), {
            x: 20,
            duration: 0.5,
            stagger: 0.1,
          })
          imageReveal = false;
        }
  
        // On cycle 4 (5th tagline: "Step into the world of Buddies"), hide image before height animation
        if(newCycle === 4 && imageReveal) {
          gsap.to(handImageRef.current, {opacity: 0, duration: 0.3});
          gsap.to(introCopyRef.current.querySelectorAll('p'), {
            x: 20,
            duration: 0.5,
            stagger: 0.1,
          })
          imageReveal = false;
        }
  
        if (progress <= 7 / 8) {
          const animationProgess = Math.max(0, (progress - 6 / 8) / (1 / 8));
          const newHeight = gsap.utils.interpolate(
            52.75,
            100,
            animationProgess
          ); 
          const newOpacity = gsap.utils.interpolate(1, 0, animationProgess);
          gsap.set(handRef.current, {height: `${newHeight}%`});
          gsap.set(introRef.current, {opacity: 1});
          gsap.set(h1ElementRef.current, {opacity: newOpacity});
          gsap.set(h1ElementRef.current.querySelector('span'), {
            opacity: newOpacity,
          })
        } else {
          gsap.set(introRef.current, { opacity: 0});
        }

        if(progress <= 8 / 8) {
          const scaleProgress = Math.max(0, (progress - 7 / 8) / (1 / 8));
          const newScale = gsap.utils.interpolate(1, 20, scaleProgress);
          gsap.set(handRef.current, {scale: newScale});
        }
        
        if(progress <= 8.5 / 8) {
          const opacityProgress = Math.max(0, (progress - 7 / 8) / (0.5 / 8));
          const newOpacity = gsap.utils.interpolate(1, 0, opacityProgress);
          gsap.set(handRef.current, {opacity: newOpacity});
        }

        if(progress > 7 / 8) {
          const revealProgress = Math.max(0, (progress - 7 / 8) / (1 / 8));
          const newOpacity = gsap.utils.interpolate(0, 1, revealProgress);
          gsap.set(websiteContainerRef.current, {opacity: newOpacity});
        } else {
          gsap.set(websiteContainerRef.current, {opacity: 0});
        }

             
         
        }
      
    })

    return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, { scope: containerRef })

  return (
    <>
    <ReactLenis root options={{lerp: 0.1, duration: 1.5, syncTouch: true}}>
      <div className="container" ref={containerRef}>
        <section className="sticky" ref={stickyRef}>
          <div className="hand-container" ref={handleContainerRef}>
            <div className="hand" ref={handRef}>
              <img src="/img/hand.png" alt="clock hand" ref={handImageRef} />
            </div>
          </div>

          <div className="intro" ref={introRef}>
            <div ref={h1ElementRef}>
              {taglines[currentCycle]}
            </div>

            <div ref={introCopyRef}>
              <p>
              Abhiko is an all-in-one platform empowering restaurants, cafés, and food stalls to manage operations, engage customers, and grow their business seamlessly from one smart system.
              </p>
              <p>
              From order tracking to staff coordination, menu management, and customer engagement, Abhiko provides the tools needed to serve better, scale faster, and connect deeper.
              </p>
            </div>
          </div>

          <div className="website-content" ref={websiteContainerRef}>
            <h1>Abhiko</h1>
          </div>
        </section>
        <section className="about">
          <h1>Upcoming</h1>
        </section>
      </div>
      </ReactLenis>
    </>
  )
}

export default Loader
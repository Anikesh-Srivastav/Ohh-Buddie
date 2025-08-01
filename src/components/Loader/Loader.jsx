import './Loader.css'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

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
    <h1 key={0}><span>It's time to</span> make a bold move</h1>,
    <h1 key={1}><span>It's time to</span> turn heads</h1>,
    <h1 key={2}><span>It's time to</span> get it in 69 minutes</h1>,
    <h1 key={3}>Welcome to <span>Ohh! Buddie</span> — fashion delivered fast</h1>,
    <h1 key={4}><span>Step into</span> the world of Buddies</h1>,
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

        if(newCycle === 5 && !imageReveal) {
          gsap.to(handImageRef.current, {opacity: 1, duration: 0.3});
          gsap.to(introCopyRef.current.querySelectorAll('p'), {
            x: 0,
            duration: 0.5,
            stagger: 0.1,
          })
          imageReveal = true;
        } else if(newCycle !== 5 && imageReveal) {
          gsap.to(handImageRef.current, {opacity: 0, duration: 0.3});
          gsap.to(introCopyRef.current.querySelectorAll('p'), {
            x: 20,
            duration: 0.5,
            stagger: 0.1,
          })
          imageReveal = false;
        }

        if (progress <= 6 / 8) {

          
          const animationProgess = Math.max(0, (progress - 5 / 8) / (1 / 8));
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
        
      }
    })
  }, { scope: containerRef })

  return (
    <>
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
                Ohh! Buddie is your go-to fashion destination, delivering trendsetting styles to your door in just 69 minutes. Fast. Fearless. Fashion-forward.
              </p>
              <p>
                Ohh! Buddie is your go-to fashion destination, delivering trendsetting styles to your door in just 69 minutes. Fast. Fearless. Fashion-forward.
              </p>
            </div>
          </div>

          <div className="website-content" ref={websiteContainerRef}>
            <h1>Ohh! Buddie</h1>
          </div>
        </section>
        <section className="about">
          <h1>Upcoming</h1>
        </section>
      </div>
    </>
  )
}

export default Loader

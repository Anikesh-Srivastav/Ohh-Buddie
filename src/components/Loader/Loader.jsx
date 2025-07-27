import './Loader.css'

const Loader = () => {
  return (
    <>
      <div className="container">
        <section className="sticky">
            <div className='hand-container'>
                <div className="hand">
                    <img src="img/hand.png" alt="logo" />
                </div>
            </div>
            
            <div className="intro">
                <h1>
                    <span>It's time to</span> stop waiting
                </h1>
            </div>
            <div>
                <p>
                   Ohh! Buddie is your go-to fashion destination, delivering trendsetting styles to your door in just 69 minutes. Fast. Fearless. Fashion-forward.
                </p>
                <p>
                   Ohh! Buddie is your go-to fashion destination, delivering trendsetting styles to your door in just 69 minutes. Fast. Fearless. Fashion-forward.
                </p>
            </div>
            <div className="website-content">
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
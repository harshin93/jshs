import landingSection from '../assets/landingSection.svg'

function LandingSection(){
    return(
        <div className="landingSection">
            <div className='landingSection'>
                <img src={landingSection} alt="Landing Section"/>
            </div>
            <div className='landingSection'>
                <h1>Discover Your Dream Job<br/> and <br/> <span>Apply Today</span></h1>
            </div>
        </div>
    )
}

export default LandingSection
import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import "./css.css"
import hex2rgb from "./hex2rgb.js"

function App() {
  const [formState, setFormState] = useState({
    color: "rgb(230, 232, 209)",
    size: "30px",
    radius: 50,
    distance: 25,
    intenisty: 50,
    blur: 50,
    shapeOption: "Flat",
  })
  const [darkTheme, setDarkTheme] = useState(false)
  function toggleTheme() {
    setDarkTheme(prev => !prev)
  }
  interface rgb {
    r?: number,
    g?: number,
    b?: number,
  }

  let backgroundColorRGB: rgb
  backgroundColorRGB = hex2rgb(formState.color) ? hex2rgb(formState.color) : { r: 230, g: 232, b: 209 }
  var shapeStyle;
  switch (formState.shapeOption) {
    case "Flat":
      shapeStyle = "none"
      break;
    case "Convex":
      shapeStyle = "linear-gradient(145deg, #ffffff67, #04040435)"
      break;
    case "Concave":
      shapeStyle = "linear-gradient(145deg, #3a3a3a4a, #ffffff42)"
      break;
    case "Pressed":
      shapeStyle = `box-shadow: rgba(50, 50, 93, 0.25) ${formState.distance}px ${formState.distance}px ${formState.blur * 2}px -12px inset, rgba(0, 0, 0, 0.3) ${formState.distance}px ${formState.distance}px ${formState.blur * 2}px -18px inset`
      break;
  }
  let boxShadowStyle: string
  if (formState.shapeOption === "Pressed") {
    boxShadowStyle = `rgba(50, 50, 93, 0.25) ${formState.distance}px ${formState.distance}px ${formState.blur * 2}px -12px inset, rgba(0, 0, 0, 0.3) ${formState.distance}px ${formState.distance}px ${formState.blur * 2}px -18px inset`
  } else {
    boxShadowStyle = `${formState.distance}px ${formState.distance}px ${formState.blur * 2}px  rgba(1, 0, 0, ${formState.intenisty / 100}), ${formState.distance}px ${formState.distance}px ${formState.blur * 2}px rgba(255, 255, 255,${formState.intenisty / 100})`
  }
  useEffect(() => {
    if (backgroundColorRGB.r + backgroundColorRGB.g + backgroundColorRGB.b <= 382) {
      setDarkTheme(true)
    } else {
      setDarkTheme(false)
    }
    return
  }, [formState.color]);
  let boxDynamicStyles = {
    backgroundColor: formState.color,
    height: `${formState.size}%`,
    width: `${formState.size}%`,
    borderRadius: `${formState.radius / 2}%`,
    boxShadow: boxShadowStyle
  }


  function handleChange(e: React.ChangeEvent<any>): void {
    e.preventDefault()
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    })
  }
  var thirdValueInBoxShadow;
  useEffect(() => {
    thirdValueInBoxShadow = formState.distance

    return () => {
      thirdValueInBoxShadow = 0
    }
  }, [formState.distance])
  useEffect(() => {
    thirdValueInBoxShadow = formState.blur

    return () => {
      thirdValueInBoxShadow = 0
    }
  }, [formState.blur])

  return (
    //try the --main color functionality below that were you left yesterday
    <div className="App" id={darkTheme ? "dark" : "light"} style={{ backgroundColor: formState.color }} >
      <h1>Quick Aestheticism</h1>
      <div className="hero-container">
        <div className='output-box-container'>

          <div className="output-box" style={boxDynamicStyles}>
            <div className='output-box-overlay' style={{ background: shapeStyle }}></div>
          </div>

        </div>
        <div className="input-box">
          <form>
            <div className='color-input'>
              <label htmlFor="color" >Pick a color</label>
              <input id='color' name='color' type="color" value="red" onChange={(e) => handleChange(e)}></input></div>
            <label htmlFor="size" >size</label>
            <input id="size" name="size" type="range" min="10" max="100" value={formState.size.match(/\d/g)?.join("")} className="slider" onChange={(e) => handleChange(e)} />
            <label htmlFor="radius" >radius</label>
            <input id="radius" type="range" min="1" max="100" name="radius" value={formState.radius} className="slider" onChange={(e) => handleChange(e)} />
            <label htmlFor="distance" >distance</label>
            <input id="distance" type="range" min="5" max="50" name="distance" value={formState.distance} className="slider" onChange={(e) => handleChange(e)} />
            <label htmlFor="intenisty" >intenisty</label>
            <input id="intenisty" type="range" min="0" max="100" name="intenisty" value={formState.intenisty} className="slider" onChange={(e) => handleChange(e)} />
            <label htmlFor="blur" >blur</label>
            <input id="blur" type="range" min="1" max="100" name="blur" value={formState.blur} className="slider" onChange={(e) => handleChange(e)} />
            <div className='form-input-container'>
              <label>
                <div className='shape'>
                  <p>Shape</p>
                  <div className='shape-options-container'>
                    <input type="button" className='shape-option' value="Flat" onClick={(e) => setFormState({
                      ...formState,
                      shapeOption: (e.target as HTMLInputElement).value
                    })} />
                    <input type="button" className='shape-option' value="Convex" onClick={(e) => setFormState({
                      ...formState,
                      shapeOption: (e.target as HTMLInputElement).value
                    })} />
                    <input type="button" className='shape-option' value="Concave" onClick={(e) => setFormState({
                      ...formState,
                      shapeOption: (e.target as HTMLInputElement).value
                    })} />
                    <input type="button" className='shape-option' value="Pressed" onClick={(e) => setFormState({
                      ...formState,
                      shapeOption: (e.target as HTMLInputElement).value
                    })} />
                  </div>
                </div>

              </label>
            </div>
          </form>
          <div className='generated-code'>
            <code>
              <span><span className="code-key">background :</span> {formState.color};</span>
              <span><span className="code-key">border-radius: </span>{formState.radius / 2}%;</span>
              <span><span className="code-key">background : </span>{formState.shapeOption !== "Flat" ? formState.color : boxShadowStyle};</span>
              <span><span className="code-key">box-shadow : </span>{boxShadowStyle};</span>
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

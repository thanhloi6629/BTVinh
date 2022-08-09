import {createContext, useContext} from 'react';
//rafc
const themes = {
    light :{
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222'
    }
}
const ThemContext = createContext(themes.light);

const ContextAPi = () => {
  return (
    <div>
      <ThemContext.Provider value={themes.dark}>
        <Toolbar/>
      </ThemContext.Provider>
    </div>
  )
}

const Toolbar = () => <ThemedButton/>

const ThemedButton = () => {
    const theme = useContext(ThemContext);
    return (
        <button style={{background: theme.background, color: theme.foreground}}>
            I am styled by theme context
        </button>
    )
}
export default ContextAPi

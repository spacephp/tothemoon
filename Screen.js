import Screen from './src/Screen';
export function createScreen(title) {
    return () => { return <Screen title={title}/>}
} 
export default Screen;
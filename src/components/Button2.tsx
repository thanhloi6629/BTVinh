export interface EventHandlerProps {
    onClick: (e: React.MouseEvent) => void
  }
  
  export function EventHandler({ onClick }: EventHandlerProps) {
    // handle focus events in a separate function
    function onFocus(e: React.FocusEvent) {
      console.log('Focused!', e.currentTarget)
    }
  
    return (
      <button
        onClick={onClick}
        onFocus={onFocus}
        onKeyDown={e => {
          // When using an inline function, the appropriate argument signature
          // is provided for us
        }}
      >
        Click me!
      </button>
    )
  }


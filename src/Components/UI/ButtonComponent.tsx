import {FC} from "react";
import { ButtonProps } from "types";

const ButtonComponent: FC<ButtonProps> = ({text, handleClick, disabled}) => (<button onClick={handleClick} disabled={disabled}> {text} </button>);

export default ButtonComponent;

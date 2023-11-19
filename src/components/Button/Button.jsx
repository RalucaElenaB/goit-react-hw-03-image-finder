import { string } from 'prop-types';
import './Button.modules.css';

const Button = props => {
  const { text, type, clickHandler } = props;

  return (
    <div className="Center-buttons">
      <button
        className="Button"
        type={type}
        onClick={clickHandler}
        aria-label={text}
      >
        {text}
      </button>
    </div>
  );
};

Button.defaultProps = {
  type: 'button',
  text: 'click me',
};

Button.propTypes = {
  type: string,
  text: string,
};

export default Button;

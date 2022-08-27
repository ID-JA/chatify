import PropsTypes from 'prop-types';
import { ChatifyLogoRounded } from './ChatifyLogoRounded';
import { ChatifyLogoText } from './ChatifyLogoText';

export function ChatifyLogo({ type }) {
  if (type === 'mark') {
    return <ChatifyLogoRounded />;
  }
  return <ChatifyLogoText />;
}

ChatifyLogo.prototype = {
  type: PropsTypes.oneOf(['full', 'mark']),
};

ChatifyLogo.defaultProps = {
  type: 'full',
};

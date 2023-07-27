import NotFound from './404';
import styles from './404.module.scss';

const notFoundPage = new NotFound('div', {
  classError: `${styles.error}`,
  classSpanError: `${styles.span_error}`,
  error: '404',
  classDescription: `${styles.description}`,
  classSpanDescription: `${styles.span_description}`,
  description: 'Не туда попали',
  classBack: `${styles.back}`,
  back: 'Назад к чатам',
  attr: {
    class: `${styles.notFound_wrapper}`,
  },
});

export default notFoundPage;

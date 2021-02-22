import { history } from 'umi';

export const redirectRoute = route => {
  history.push(route);
};

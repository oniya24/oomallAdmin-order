export const compactMapState: Function = (funcArr: Array<Function>) => {
  return (props: any): Object => {
    return funcArr.reduce((result, func) => {
      return { ...result, ...func(props) };
    }, {});
  };
};

export const compactMapDispatch: Function = (funcArr: Array<Function>) => {
  return (dispatch: any): Object => {
    return funcArr.reduce((result, func) => {
      return { ...result, ...func(dispatch) };
    }, {});
  };
};

export const defaultMapDispatchToProps = (model: any) => {
  return (dispatch: any) => {
    const obj = Object.keys(model.effects).reduce((result, key) => {
      return {
        ...result,
        [key]: (payload: any) =>
          dispatch({ type: `${model.namespace}/${key}`, payload }),
      };
    }, {});
    return obj;
  };
};

export const defaultMapStateToProps = (model: any) => {
  return (props: any) => {
    const loading = props['loading'];
    const effectsLoading = Object.keys(model.effects).reduce((result, key) => {
      return {
        ...result,
        [`${key}Loading`]: loading.effects[`${model.namespace}/${key}`],
      };
    }, {});
    return {
      ...props[model.namespace],
      ...effectsLoading,
    };
  };
};

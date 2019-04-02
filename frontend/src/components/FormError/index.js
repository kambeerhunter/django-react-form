import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({error}) => (
  <div className="mt-3">
    <div className="text-danger">
      ! {error}
    </div>
  </div>
)


FormError.propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.string,
  ]),
}

FormError.defaultProps = {
  error: null,
}

export default FormError;

import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

const required = value => (
  value || typeof value === 'string' ?
    undefined : 'Это поле обязательно для заполнения'
);

const Transfer = ({list, onSubmit, onReset}) => {
  return (
    <React.Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();}
        }
      >
        <div className="form-group">
          <Field
            name="source"
            component="select"
            className="form-control"
            validate={[required]}
          >
            <option>-----</option>
            {list.map(item => (
              <option
                key={`${item.inn}`}
                value={item.pk}
              >
                {item.username}
              </option>
            ))}
          </Field>
        </div>

        <div className="form-group">
          <Field
            name="innList"
            type="text"
            component="input"
            placeholder="Список ИНН"
            className="form-control"
            validate={[required]}
          />
        </div>

        <div className="form-group">
          <Field
            name="value"
            type="number"
            component="input"
            placeholder="Сумма перечисления"
            className="form-control"
            step="0.01"
            validate={[required]}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Выполнить перевод
        </button>
      </form>
    </React.Fragment>
  )
}

Transfer.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  onSubmit: PropTypes.func.isRequired,
}

Transfer.defaultProps = {
  list: [],
}


const TransferForm = reduxForm({
  form: 'transfer',
})(Transfer);

export default TransferForm;

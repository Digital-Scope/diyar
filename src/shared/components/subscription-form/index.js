import React from 'react';
import { translate } from 'react-i18next';
import { Formik, Field } from 'formik';

import Icon from '../icon';
import ctaArrow from '../icon/cta-arrow.icon';
import './subscription-form.scss';

const onSubmit = (email, subscriptionId, done) => {
  console.log('TODO: onSubmit', email, subscriptionId);
  done();
};

const Form = translate('labels')(({
  handleSubmit,
  subscriptionId,
  t,
}) => (
  <form
    className="subscription-form"
    id={`subscription-form-${subscriptionId}`}
    onSubmit={handleSubmit}
  >
    <Field type="email" name="email" placeholder={t('subscriptionForm').inputPlaceholder} />
    <button type="submit"><Icon id={ctaArrow.id} /></button>
  </form>
));

const SubscriptionForm = ({ subscriptionId }) => (
  <Formik
    initialValues={{ email: '' }}
    onSubmit={(values, actions) => (
      onSubmit(values.email, subscriptionId, () => {
        actions.setSubmitting(false);
        actions.resetForm({ email: '' });
      })
    )}
    render={props => <Form {...props} subscriptionId={subscriptionId} />}
  />
);

export default SubscriptionForm;

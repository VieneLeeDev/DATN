import React from 'react';
import { Form, Input } from 'antd';

const PassWorkEdit = (props: any) => {
	const { form } = props;

	return (
		<>
			<Form.Item
				name="password"
				rules={[
					{
						min: 6,
						message: 'Password must be at least 6 characters long!',
					}
				]}
				hasFeedback
			>
				<span className='block my-1'>Password:</span>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm_password"
				dependencies={['password']}
				hasFeedback
				rules={[
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The new password that you entered do not match!'));
						},
					}),
				]}
			>
				<span className='block my-1 '>Confirm Password:</span>
				<Input.Password />
			</Form.Item>
		</>
	);
}

export default PassWorkEdit;

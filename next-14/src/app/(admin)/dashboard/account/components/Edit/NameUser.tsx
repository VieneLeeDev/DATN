import { Form, Input } from 'antd'
import React, { useState } from 'react'
const NameUser = (props: any) => {
	const { oldName, onChange } = props
	const [newName, setNewName] = useState(oldName)
	const handleChange = (e: any) => {
		setNewName(e.target.value)
	}
	return (
		<Form.Item name={'name'}>
			<span className='block my-2'>New Name:</span>
			<Input value={newName} onChange={handleChange}></Input>
		</Form.Item>
	)
}

export default NameUser
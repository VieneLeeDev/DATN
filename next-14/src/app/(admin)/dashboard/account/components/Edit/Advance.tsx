import { Select, Form } from 'antd'
import React, { useEffect } from 'react'

const Advance = (props: any) => {
	const { role, status, form } = props

	const roleList = [{ value: 'admin', label: <span>Admin</span> }, { value: 'user', label: <span>User</span> }]
	const statusList = [{ value: 'active', label: <span>Active</span> }, { value: 'resigned', label: <span>Resigned</span> }]
	return (
		<>
			<Form.Item name={"role"} >
				<span className='block my-1'>Role:</span>
				<Select value={role} options={roleList} />
			</Form.Item>
			<Form.Item name={"status"} >
				<span className='block my-1'>Status:</span>
				<Select value={status} options={statusList} />
			</Form.Item>
		</>
	)
}

export default Advance
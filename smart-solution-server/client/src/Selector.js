import React, { useState } from 'react';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';

export default function Selector({index, select}) {

	const [current, setCurrent] = useState(`Sample ${index}`);

	const onSelect = (e) => {
		setCurrent(e.item.props.children[0])
    select(index, e.key);
  }

	const menu = (
		<Menu onSelect={onSelect}>
			<MenuItem key="garage1">Drum 1</MenuItem>
			<MenuItem key="garage2">Drum 2</MenuItem>
			<MenuItem key="garage3">Drum 3</MenuItem>
			<MenuItem key="bass1">Bass 1</MenuItem>
			<MenuItem key="bass2">Bass 2</MenuItem>
			<MenuItem key="bass3">Bass 3</MenuItem>
			<MenuItem key="guitar1">Guitar 1</MenuItem>
			<MenuItem key="guitar2">Guitar 2</MenuItem>
			<MenuItem key="guitar3">Guitar 3</MenuItem>
			<MenuItem key="house1">House 1</MenuItem>
			<MenuItem key="house2">House 2</MenuItem>
			<MenuItem key="house3">House 3</MenuItem>
			<MenuItem key="house4">House 4</MenuItem>
		</Menu>
	);

	return (
		<Dropdown
			trigger={['click']}
			overlay={menu}
			animation="slide-up"
		>
			<button style={{ width: 100 }}>{current}</button>
		</Dropdown>
	)
}

import { useState } from 'react';

const MessageOptions = ({ onFontFamilyChange, onColorChange, onFontSizeChange }) => {
	const [fontFamily, setFontFamily] = useState('Arial, sans-serif');
	const [color, setColor] = useState('#000000');
	const [fontSize, setFontSize] = useState(16);

	const handleFontFamilyChange = (e) => {
		const newFontFamily = e.target.value;
		setFontFamily(newFontFamily);
		onFontFamilyChange(newFontFamily);
	};

	const handleColorChange = (e) => {
		const newColor = e.target.value;
		setColor(newColor);
		onColorChange(newColor);
	};

	const handleFontSizeChange = (e) => {
		const newFontSize = e.target.value;
		setFontSize(newFontSize);
		onFontSizeChange(newFontSize);
	};

	return (
		<div className="message-options mb-2">
			<label style={{marginLeft: "30px"}}>
				Font Family:
				<select value={fontFamily} onChange={handleFontFamilyChange} style={{ marginRight: '40px', marginLeft: '8px' }}>
        <option value="Arial, sans-serif">Arial</option>
        <option value="'Lucida Console', monospace">Lucida Console</option>
        <option value="'Courier New', monospace">Courier New</option>
    </select>
			</label>
			<label style={{marginRight: "30px"}}>
				Color:
				<input type="color" value={color} onChange={handleColorChange} style={{marginLeft: '10px'}}/>
				<span style={{ marginLeft: '8px', color, marginRight: "20px" }}>{color}</span>
			</label>
			<label>
				Font Size:
				<select value={fontSize} onChange={handleFontSizeChange} style={{ marginLeft: '8px' }}>
					<option value={16}>16px</option>
					<option value={18}>18px</option>
					<option value={20}>20px</option>
					<option value={24}>24px</option>
          <option value={30}>30px</option>
				</select>
			</label>
		</div>
	);
};

export default MessageOptions;

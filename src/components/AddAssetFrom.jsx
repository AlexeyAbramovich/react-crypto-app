import { useRef, useState } from 'react'
import { useCrypto } from '../hooks/useCrypto'
import {
  Select,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from 'antd'
import { SelectItem } from './SelectItem'
import { CoinInfo } from './CoinInfo'

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not valid number',
  },
  range: '${label} must be between ${min} and ${max}',
}

export const AddAssetFrom = ({ onClose }) => {
  const { data, addAsset } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  const handleSelect = (value) => {
    setCoin(data.find((coin) => coin.id === value))
  }

  const handleAmountChange = (value) => {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(amount ? amount : 0 * value).toFixed(2),
    })
  }

  const onFinish = (values) => {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    addAsset(newAsset)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <Result
        status="success"
        title="New asset added"
        subTitle={`Added ${assetRef.current.amount} ${coin.name} by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="close" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    )
  }

  if (!coin) {
    return (
      <Select
        style={{ width: '50%' }}
        placeholder="Select Coin"
        onSelect={handleSelect}
        options={data.map((coin) => ({
          label: coin.symbol,
          value: coin.id,
          icon: coin.icon,
          name: coin.name,
        }))}
        optionRender={(option) => <SelectItem option={option} />}
      />
    )
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}

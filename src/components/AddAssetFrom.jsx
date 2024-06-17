import { useState } from 'react'
import { useCrypto } from '../hooks/useCrypto'
import {
  Select,
  Flex,
  Divider,
  Typography,
  Form,
  InputNumber,
  Button,
  DatePicker,
} from 'antd'
import { SelectItem } from './SelectItem'

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not valid number',
  },
  range: '${label} must be between ${min} and ${max}',
}

export const AddAssetFrom = () => {
  const { data } = useCrypto()
  const [coin, setCoin] = useState(null)
  const [form] = Form.useForm()

  const handleSelect = (value) => {
    setCoin(data.find((coin) => coin.id === value))
  }

  const handleAmountChange = (value) => {
    form.setFieldsValue({
      total: +(value * coin.price).toFixed(2),
    })
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

  const onFinish = (values) => {}

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
      <Flex align="center">
        <img
          src={coin.icon}
          alt={coin.name}
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography.Title level={2} style={{ margin: 0 }}>
          ({coin.symbol}) {coin.name}
        </Typography.Title>
      </Flex>
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
        <InputNumber disabled style={{ width: '100%' }} />
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

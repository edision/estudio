import React from 'react';
import { observer } from 'mobx-react';
// qnui
import Field from 'qnui/lib/field';
import Form from 'qnui/lib/form';
import Input from 'qnui/lib/input';
import Button from 'qnui/lib/button';

const FormItem = Form.Item;

@observer
class Edit extends React.Component {
  componentWillMount() {
    const record = this.props.record;
    if (record) {
      this.field.setValues(record);
    }
  }

  field = new Field(this);

  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 }
  }

  handleSubmit = e => {
    e.preventDefault();
    // console.log(this.field.getValues());
    this.field.validate((errors, values) => {
      if (errors) {
        return;
      }
      if (this.props.onSubmit) this.props.onSubmit(values);
    });

  }

  handleReset = e => {
    e.preventDefault();
    const record = this.props.record;
    if (record) {
      this.field.setValues(record);
    } else {
      this.field.reset();
    }
  }

  render() {
    const init = this.field.init;

    return (
      <div style={{ width: 600 }}>
        <Form size="large" field={this.field} onSubmit={this.handleSubmit}>
          <FormItem label="键" {...this.formItemLayout} hasFeedback>
            <Input  {...init('key', { rules: [{ required: true, message: '键必须填写' }] }) } placeholder="请输入键名..." />
          </FormItem>
          <FormItem label="值" {...this.formItemLayout} hasFeedback>
            <Input {...init('value', { rules: [{ required: true, message: '值必须填写' }] }) } placeholder="请输入值..." />
          </FormItem>
          <FormItem label="说明" {...this.formItemLayout}>
            <Input multiple {...init('desc') } maxLength={500} hasLimitHint placeholder="说明,如：表xxx的序号..." />
          </FormItem>
          <FormItem wrapperCol={{ offset: this.formItemLayout.labelCol.span }}>
            <Button type="primary" htmlType="submit">确定</Button>
            &emsp;
            <Button onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Edit;

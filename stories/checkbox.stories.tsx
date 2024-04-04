import { StoryObj , Meta } from '@storybook/react';
import { Checkbox }  from '../components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  render: () => <Checkbox/>,
};
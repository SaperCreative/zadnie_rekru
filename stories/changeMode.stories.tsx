import { StoryObj , Meta } from '@storybook/react';
import ChangeMode  from '../components/ui/changeMode';

const meta: Meta<typeof ChangeMode> = {
  component: ChangeMode,
};

export default meta;
type Story = StoryObj<typeof ChangeMode>;

export const Primary: Story = {
  render: () => <ChangeMode/>,
};
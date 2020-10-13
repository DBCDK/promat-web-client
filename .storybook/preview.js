// import React from 'react'
import { addReadme } from 'storybook-readme';
import { addDecorator } from '@storybook/react';
// import { MemoryRouter } from 'react-router'
import StoryRouter from 'storybook-react-router';

addDecorator(addReadme);
addDecorator(StoryRouter())
// addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
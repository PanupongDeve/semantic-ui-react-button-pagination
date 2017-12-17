'use strict';

import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Pagination from '../src/Pagination';

configure({adapter: new Adapter()});

describe('Error Case', () => {
  console.error = jest.fn(error => {
    throw new Error(error);
  });

  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <div>
        <Pagination {...props}/>
      </div>
    ).find('.ui.buttons.semantic-ui-react-button-pagination');
  };

  const propTypeErrorMessage = (propName, actualType, expectedValue) => {
    return 'Warning: Failed prop type: Failed prop type: ' +
      `Invalid prop \`${propName}\` of type \`${actualType}\` supplied to \`Pagination\`, expected \`${expectedValue}\`\.`;
  };

  const propValueErrorMessage = (propName, actualValue, expectedValue) => {
    return 'Warning: Failed prop type: Failed prop value: ' +
      `Invalid prop \`${propName}\` of value \`${actualValue}\` supplied to \`Pagination\`, expected a number greater than or equal to \`${expectedValue}\`\.`;
  };

  // ********************************************************************************
  describe("validate prop: 'offset'", () => {
    it("offset: '0'", () => {
      expect(() => {
        wrapper({offset: '0', limit: 1, total: 0});
      }).toThrow(propTypeErrorMessage('offset', 'string', 'number'));
    });

    it("offset: -1", () => {
      expect(() => {
        wrapper({offset: -1, limit: 1, total: 0});
      }).toThrow(propValueErrorMessage('offset', -1, 0));
    });
  });

  // ********************************************************************************
  describe("validate prop: 'limit'", () => {
    it("limit: '1'", () => {
      expect(() => {
        wrapper({offset: 0, limit: '1', total: 0});
      }).toThrow(propTypeErrorMessage('limit', 'string', 'number'));
    });

    it("limit: 0", () => {
      expect(() => {
        wrapper({offset: 0, limit: 0, total: 0});
      }).toThrow(propValueErrorMessage('limit', 0, 1));
    });
  });

  // ********************************************************************************
  describe("validate prop: 'total'", () => {
    it("total: '0'", () => {
      expect(() => {
        wrapper({offset: 0, limit: 1, total: '0'});
      }).toThrow(propTypeErrorMessage('total', 'string', 'number'));
    });

    it("total: -1", () => {
      expect(() => {
        wrapper({offset: 0, limit: 1, total: -1});
      }).toThrow(propValueErrorMessage('total', -1, 0));
    });
  });
});

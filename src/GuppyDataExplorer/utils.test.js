import { labelToTitle, calculateDropdownButtonConfigs, humanizeNumber } from './utils';

describe('utils for data visualization explorer', () => {
  it('calculate dropdown button configurations correctly', () => {
    const buttonConfigs = [
      {
        enabled: true,
        title: 'Download Clinical',
        dropdownId: '1',
      },
      {
        enabled: true,
        title: 'Download Manifest',
        dropdownId: '1',
      },
      {
        enabled: true,
        title: 'Export All to Saturn',
        dropdownId: '2',
      },
      {
        enabled: true,
        title: 'Export All to GoogleCloud',
        dropdownId: '2',
      },
      {
        enabled: true,
        title: 'Reset Filters',
      },
    ];
    const input = {
      dropdowns: {
        1: {
          title: 'Download',
        },
        2: {
          title: 'Upload',
        },
      },
      buttons: buttonConfigs,
    };
    const buttonsList1 = buttonConfigs.filter(b => b.dropdownId === '1');
    const buttonsList2 = buttonConfigs.filter(b => b.dropdownId === '2');
    const expectOutput = {
      1: {
        dropdownConfig: {
          title: 'Download',
        },
        buttonConfigs: buttonsList1,
        cnt: buttonsList1.length,
      },
      2: {
        dropdownConfig: {
          title: 'Upload',
        },
        buttonConfigs: buttonsList2,
        cnt: buttonsList2.length,
      },
    };
    expect(calculateDropdownButtonConfigs(input)).toEqual(expectOutput);
  });

  it('humanize number', () => {
    expect(humanizeNumber(12)).toBe(12);
    expect(humanizeNumber(1200, 1)).toBe('1.2K');
    expect(humanizeNumber(1200000, 1)).toBe('1.2M');
    expect(humanizeNumber(1200000000, 1)).toBe('1.2B');
    expect(humanizeNumber(1200000000000, 1)).toBe('1.2T');
    expect(humanizeNumber(1200000000000000, 1)).toBe('1.2Qa');
  });

  it('Convert label to Title', () => {
    expect(labelToTitle('test')).toBe('Tests');
    expect(labelToTitle('case')).toBe('Cases');
    expect(labelToTitle('file')).toBe('Files');
    expect(labelToTitle('test', false)).toBe('tests');
    expect(labelToTitle('case', false)).toBe('cases');
    expect(labelToTitle('file', false)).toBe('files');
    expect(labelToTitle('test case with odd stuff_21file')).toBe('Test case with odd stuff_21files');
  });
});

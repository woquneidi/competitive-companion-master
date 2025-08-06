import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class CodeMarshalProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['https://algo.codemarshal.org/problems/*', 'https://algo.codemarshal.org/contests/*/problems/*'];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const elem = htmlToElement(html);
    const task = new TaskBuilder('CodeMarshal').setUrl(url);

    const content = elem.querySelector('#main div div');

    task.setName(content.querySelector('div.h1').textContent);

    if (elem.querySelector('.panel-contest-timer') !== null) {
      task.setCategory(elem.querySelector('.panel-contest-timer > .panel-heading > h3').textContent.trim());
    }

    const scoreCpuTimeMemory = content.querySelector('p:first-of-type').textContent;

    let memory = scoreCpuTimeMemory.substr(scoreCpuTimeMemory.indexOf('Memory: ') + 'Memory: '.length);
    memory = memory.substr(0, memory.length - 2);

    const cpuTime = scoreCpuTimeMemory.substring(
      scoreCpuTimeMemory.indexOf('CPU: ') + 'CPU: '.length,
      scoreCpuTimeMemory.indexOf('Memory: ') - 1,
    );

    task.setTimeLimit(parseFloat(cpuTime) * 1000);
    task.setMemoryLimit(parseInt(memory, 10));

    const inputs = content.querySelectorAll('.sample-input');
    const outputs = content.querySelectorAll('.sample-output');

    for (let i = 0; i < inputs.length && i < outputs.length; i++) {
      task.addTest(inputs[i].textContent, outputs[i].textContent);
    }

    return task.build();
  }
}

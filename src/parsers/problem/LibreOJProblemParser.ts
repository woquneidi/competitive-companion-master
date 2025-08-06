import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class LibreOJProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['https://loj.ac/p/*', 'https://libreoj.github.io/contest/*/problem/*'];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const elem = htmlToElement(html);
    const task = new TaskBuilder('LibreOJ').setUrl(url);

    if (!url.includes('contest/')) {
      this.parseNormalProblem(elem, task);
    } else {
      this.parseContestProblem(elem, task);
    }

    return task.build();
  }

  private parseNormalProblem(elem: Element, task: TaskBuilder): void {
    const nbsp = new RegExp(String.fromCharCode(160), 'g');
    task.setName(elem.querySelector('.ui.header > span').textContent.replace(nbsp, ' '));

    const timeLimitIcon = elem.querySelector('.label > .clock.icon');
    const timeLimitStr = timeLimitIcon.parentElement.textContent.trim();
    task.setTimeLimit(parseInt(timeLimitStr.split(' ')[0]));

    const memoryLimitIcon = elem.querySelector('.label > .microchip.icon');
    const memoryLimitStr = memoryLimitIcon.parentElement.textContent.trim();
    task.setMemoryLimit(parseInt(memoryLimitStr.split(' ')[0]));

    const blocks = elem.querySelectorAll('pre[class^="_sampleDataPre_"]');
    for (let i = 0; i < blocks.length - 1; i += 2) {
      task.addTest(blocks[i].textContent, blocks[i + 1].textContent);
    }
  }

  private parseContestProblem(elem: Element, task: TaskBuilder): void {
    task.setName(elem.querySelector('.ui.header').textContent.trim());
    task.setCategory(elem.querySelector('title').text.split('-')[1].trim());

    const timeLimitStr = elem.querySelector('.row > .ui.label:nth-child(2)').textContent;
    const timeLimit = parseFloat(timeLimitStr.split('：')[1]);
    if (!Number.isNaN(timeLimit)) {
      task.setTimeLimit(timeLimit);
    }

    const memoryLimitStr = elem.querySelector('.row > .ui.label:nth-child(1)').textContent;
    const memoryLimit = parseFloat(memoryLimitStr.split('：')[1]);
    if (!Number.isNaN(memoryLimit)) {
      task.setMemoryLimit(memoryLimit);
    }

    const samplesRow = [...elem.querySelectorAll('.row')].find(el => {
      const titleElem = el.querySelector('h4');
      return titleElem !== null && titleElem.textContent === '样例';
    });

    if (samplesRow) {
      const sampleBlocks = samplesRow.querySelectorAll('pre > code');
      for (let i = 0; i < sampleBlocks.length - 1; i += 2) {
        task.addTest(sampleBlocks[i].textContent, sampleBlocks[i + 1].textContent);
      }
    }
  }
}

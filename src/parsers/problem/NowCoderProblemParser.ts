import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class NowCoderProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return [
      'https://ac.nowcoder.com/acm/problem/*',
      'https://ac.nowcoder.com/acm/contest/*/*',
      'https://ac.nowcoder.com/pat/*/problem/*',
    ];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const elem = htmlToElement(html);
    const task = new TaskBuilder('NowCoder').setUrl(url);

    let contestname = 'problem';
    if (url.includes('/contest/')) {
      // 获取<title>标签内容
      const titleElem = elem.querySelector('title');
      if (titleElem) {
        // 例：A-Additive Combinatorics_第八届广西大学生程序设计大赛暨2025邀请赛
        const titleText = titleElem.textContent;
        const parts = titleText.split('_');
        if (parts.length > 1) {
          contestname = parts[1].trim();
        } else {
          contestname = titleText.trim();
        }
      }
    }
    
    // 设置固定的group为"NowCoder"
    task.setGroup('NowCoder');
    
    // 存到 task 的额外字段
    (task as any).contestname = contestname;

    if (url.includes('/acm/')) {
      this.parseACM(elem, url, task);
    } else {
      this.parsePAT(elem, url, task);
    }

    // 在 build() 结果上手动加 contestname 字段
    const result = task.build();
    (result as any).contestname = contestname;
    return result;
  }

  private parseACM(elem: Element, url: string, task: TaskBuilder): void {
    const name = elem.querySelector('.question-title').textContent.trim();
    const id = this.extractProblemId(url);
    task.setName(`${id}_${name}`, id);

    const timeLimitStr = elem.querySelector('.question-intr > .subject-item-wrap > span').textContent.split('，').pop();
    task.setTimeLimit(parseInt(/(\d+)/.exec(timeLimitStr)[1], 10) * 1000);

    const memoryLimitStr = elem
      .querySelector('.question-intr > .subject-item-wrap > span:nth-of-type(2)')
      .textContent.split('，')
      .pop();
    task.setMemoryLimit(parseInt(/(\d+)/.exec(memoryLimitStr)[1], 10));

    elem.querySelectorAll('.question-oi-bd').forEach(tests => {
      const blocks = tests.querySelectorAll('pre');
      task.addTest(blocks[0].textContent, blocks[1].textContent);
    });
  }

  private parsePAT(elem: Element, url: string, task: TaskBuilder): void {
    const id = this.extractProblemId(url);
    const name = elem.querySelector('.pat-content h3').textContent.trim().split(' (')[0];
    task.setName(`${id}_${name}`, id);

    const limitsStr = elem.querySelector('.pat-content .pat-detail-info').textContent;
    task.setTimeLimit(parseInt(/(\d+) ms/.exec(limitsStr)[1]));
    task.setMemoryLimit(parseInt(/(\d+) KB/.exec(limitsStr)[1], 10) / 1024);

    const blocks = [...elem.querySelectorAll('.module-body h3 > b')]
      .filter(el => el.textContent.includes('子:'))
      .map(el => el.parentElement.nextElementSibling);

    for (let i = 0; i < blocks.length - 1; i += 2) {
      task.addTest(blocks[i].innerHTML, blocks[i + 1].innerHTML);
    }
  }

  private extractProblemId(url: string): string {
    // 匹配比赛题目格式：/contest/99458/A
    const contestMatch = url.match(/\/contest\/(\d+)\/([A-Z])/);
    if (contestMatch) {
      return `${contestMatch[1]}-${contestMatch[2]}`; // 返回格式：99458-A
    }
    
    // 匹配其他题目格式
    const problemMatch = url.match(/problem\/(\d+)/);
    if (problemMatch) {
      return problemMatch[1];
    }
    
    return 'Unknown Id';
  }
}

import { Sendable } from '../../models/Sendable';
import { TaskBuilder } from '../../models/TaskBuilder';
import { htmlToElement } from '../../utils/dom';
import { Parser } from '../Parser';

export class LuoguProblemParser extends Parser {
  public getMatchPatterns(): string[] {
    return ['https://www.luogu.com.cn/problem/*'];
  }

  public async parse(url: string, html: string): Promise<Sendable> {
    const elem = htmlToElement(html);
    const task = new TaskBuilder('Luogu').setUrl(url);

    // 检查是否为比赛题目
    const isContest = url.includes('contestId=');
    let contestname = 'problem';
    
    if (isContest) {
      // 从面包屑导航获取比赛名
      const breadcrumbElem = elem.querySelector('.breadcrumb a');
      if (breadcrumbElem) {
        contestname = breadcrumbElem.textContent.trim();
      }
    }
    
    // 设置contestname字段
    (task as any).contestname = contestname;

    if (elem.querySelector('.main-container') !== null) {
      this.parseFromPage(task, elem, url, isContest);
    } else {
      this.parseFromScript(task, elem, url, isContest);
    }

    // 在 build() 结果上手动加 contestname 字段
    const result = task.build();
    (result as any).contestname = contestname;
    return result;
  }

  private parseFromPage(task: TaskBuilder, elem: Element, url: string, isContest: boolean): void {
    // id 从 URL 获取
    let id: string;
    if (isContest) {
      // 比赛题目：从URL提取T609493
      const urlMatch = url.match(/\/problem\/([^?]+)/);
      id = urlMatch ? urlMatch[1] : 'Unknown';
    } else {
      // 普通题目：从URL提取P12965
      const urlMatch = url.match(/\/problem\/([^\/]+)$/);
      id = urlMatch ? urlMatch[1] : 'Unknown';
    }
    
    // title 从 h1 标签获取
    const text = elem.querySelector('h1').textContent.trim();
    task.setName(text, id);

    const timeLimitStr = elem.querySelector('.stat > .field:nth-child(3) > .value').textContent;
    task.setTimeLimit(parseFloat(timeLimitStr) * 1000);

    const memoryLimitStr = elem.querySelector('.stat > .field:nth-child(4) > .value').textContent;
    task.setMemoryLimit(parseInt(memoryLimitStr));

    elem.querySelectorAll('.io-sample').forEach(sample => {
      const blocks = sample.querySelectorAll('pre');
      task.addTest(blocks[0].textContent, blocks[1].textContent);
    });
  }

  private parseFromScript(task: TaskBuilder, elem: Element, url: string, isContest: boolean): void {
    // id 从 URL 获取
    let id: string;
    if (isContest) {
      // 比赛题目：从URL提取T609493
      const urlMatch = url.match(/\/problem\/([^?]+)/);
      id = urlMatch ? urlMatch[1] : 'Unknown';
    } else {
      // 普通题目：从URL提取P12965
      const urlMatch = url.match(/\/problem\/([^\/]+)$/);
      id = urlMatch ? urlMatch[1] : 'Unknown';
    }
    
    const script = elem.querySelector('#lentille-context').textContent;
    const data = JSON.parse(script).data.problem;

    task.setName(data.title, id);

    task.setTimeLimit(Math.max(...data.limits.time));
    task.setMemoryLimit(Math.max(...data.limits.memory) / 1024);

    for (const sample of data.samples) {
      task.addTest(sample[0], sample[1]);
    }
  }
}

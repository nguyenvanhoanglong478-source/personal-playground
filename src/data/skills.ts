import { PROJECTS_DATA, SkillCategory } from './projects';
import { BilingualText } from './profile';

export interface SynthesizedSkill {
  name: string;
  category: SkillCategory;
  projects: string[];
  evidenceSummary: BilingualText;
}

/**
 * Tự động tổng hợp danh sách Kỹ năng & Công cụ từ chính mảng PROJECTS_DATA (Mục 4.4).
 * Khử trùng lặp hoàn toàn theo tên công nghệ và ghi nhận các dự án thật có sử dụng công nghệ đó.
 */
export function getSynthesizedSkills(): SynthesizedSkill[] {
  const map = new Map<string, SynthesizedSkill>();

  for (const project of PROJECTS_DATA) {
    for (const tech of project.technologies) {
      const existing = map.get(tech.name);
      if (existing) {
        if (!existing.projects.includes(project.title)) {
          existing.projects.push(project.title);
        }
      } else {
        map.set(tech.name, {
          name: tech.name,
          category: tech.category,
          projects: [project.title],
          evidenceSummary: tech.detail,
        });
      }
    }
  }

  return Array.from(map.values());
}

export const SYNTHESIZED_SKILLS: SynthesizedSkill[] = getSynthesizedSkills();

export interface Question {
  id: number;
  question_text: string;
  image_url?: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface Profile {
  id: string;
  email: string;
  paid_until: string | null;
}

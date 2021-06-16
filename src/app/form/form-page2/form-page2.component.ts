import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomerData} from "../../model/customerData";

@Component({
  selector: 'app-form-page2',
  templateUrl: './form-page2.component.html',
  styleUrls: ['./form-page2.component.css']
})
export class FormPage2Component implements OnInit {

  @Output()
  formValue: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  back: EventEmitter<void> = new EventEmitter<void>();
  lists: {
    listNr: number,
    title: string,
    subTitle: string,
    description: string,
    list: string[]
  }[] = [
    {
      listNr: 1,
      title: 'Какие индустрии Вам интересны для дальнейшего развития? ',
      subTitle: 'Выберите отрасли, которые Вам интересны или в которых Вы считаетесь специалистом.',
      description: 'Выберите от 1 до 2 вариантов',
      list: ['FinTech',
        'AI, Data, Analytics',
        'MedTech',
        'EduTech',
        'AdTech',
        'E-Sport & Games',
        ' E-commerce',
        'PropTech',
        'FoodTech',
        'Social Media',
        'Fashion',
        'Cybersecurity',
        'Cannabis (да, это легально)',
        'Другое']
    },
    {
      listNr: 2,
      title: 'Каждый человек в чем-то гений. А в чем Ваш гений?',
      subTitle: '',
      description: 'Выберите от 1 до 2 вариантов',
      list: ['FinTech',
        'Экономика и финансы',
        'Креатив и позиционирование',
        'Привлечение инвестиций',
        'Проектное управление',
        'Коммуникации и продажи',
        'Нетворкинг и партнерства',
        'Другое'
      ]
    },
    {
      listNr: 3,
      title: 'Каковы ваши цели в бизнесе, карьере на ближайшие два года?',
      subTitle: 'Уверены, что стажировки в School of C помогут их достичь.',
      description: 'Выберите от 1 до 2 вариантов',
      list: ['FinTech',
        'Стать сооснователем одного из развивающихся американских стартапов',
        'Собрать сильную команду и вывести на глобальный рынок свой продукт',
        'Получить знания, повысить свою квалификацию и рыночную стоимость как специалиста',
        'Занять руководящую позицию (C-Level) в перспективном стартапе',
        'Другое',
      ]
    },
  ]

  @Input()
  model: CustomerData | undefined;
  startupPosAnswer: string[] = [];
  interestsAnswer: string[] = [];
  businessGoalsAnswer: string[] = [];

  lvls: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  engLvl: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    if (this.model?.startupPos)
      this.startupPosAnswer = this.model.startupPos;
    if (this.model?.interests)
      this.interestsAnswer = this.model.interests;
    if (this.model?.businessGoals)
      this.businessGoalsAnswer = this.model.businessGoals;
    if (this.model?.engLvl)
      this.engLvl = this.model.engLvl;
  }

  onBack() {
    this.back.emit();
  }

  onClickElt(elt: string, listNr: number) {
    if (listNr === 1) {
      if (this.startupPosAnswer.includes(elt)) {
        this.startupPosAnswer = this.startupPosAnswer.filter(value => value !== elt);
        return;
      }
      this.startupPosAnswer.push(elt);
    } else if (listNr === 2) {
      if (this.interestsAnswer.includes(elt)) {
        const index: number = this.interestsAnswer.indexOf(elt);
        this.interestsAnswer.splice(index, 1);
        return;

      }
      this.interestsAnswer.push(elt);

    } else {
      if (this.businessGoalsAnswer.includes(elt)) {
        const index: number = this.businessGoalsAnswer.indexOf(elt);
        this.businessGoalsAnswer.splice(index, 1);
        return;
      }

      this.businessGoalsAnswer.push(elt);
    }
  }

  elementSelected(elt: string, listNr: number): boolean {
    if (listNr === 1) {
      return this.startupPosAnswer.includes(elt);

    } else if (listNr === 2) {
      return this.interestsAnswer.includes(elt);

    } else {
      return this.businessGoalsAnswer.includes(elt);
    }
  }

  arrayFull(elt: string, listNr: number): boolean {
    if (listNr === 1) {
      return this.startupPosAnswer.length === 2 && !this.startupPosAnswer.includes(elt);
    } else if (listNr === 2) {
      return this.interestsAnswer.length === 2 && !this.interestsAnswer.includes(elt);
    } else {
      return this.businessGoalsAnswer.length === 2 && !this.businessGoalsAnswer.includes(elt);
    }
  }

  onSubmit() {
    this.formValue.emit(
      {
        engLvl: this.engLvl,
        businessGoals: this.businessGoalsAnswer,
        interests: this.interestsAnswer,
        startupPos: this.startupPosAnswer
      }
    );
  }
}

import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import colors from 'tailwindcss/colors';
import { TailwindThemeColors } from 'tailwindcss/tailwind-config';
import ModalOptions from '../../../interfaces/modal-options.interface';
import Category from '../../../models/category';
import CATEGORYVALIDATIONS from '../../../validations/category';
import ModalsModal from '../modal/component';
import * as IconList from '@fortawesome/free-regular-svg-icons';
import * as SolidIconList from '@fortawesome/free-solid-svg-icons';

interface ModalsModalArgs<M> {
  options: ModalOptions<M>;
}
export default class ModalsEditCategory extends ModalsModal<Category> {
  @tracked public isLoading = false;
  private declare iconList: string[];

  validations = CATEGORYVALIDATIONS;

  constructor(owner: unknown, args: ModalsModalArgs<Category>) {
    super(owner, args);

    this.setIconList();
  }

  get getIcons() {
    return this.iconList;
  }

  get getColors() {
    const keys = Object.keys(colors).filter(
      (key) =>
        key !== 'inherit' &&
        key !== 'current' &&
        key !== 'transparent' &&
        key !== 'default'
    );

    const colorsList = keys
      .filter((key: keyof TailwindThemeColors) => {
        try {
          return colors[key] !== undefined;
        } catch (error) {
          return false;
        }
      })
      .map((colorKey: keyof TailwindThemeColors) => {
        return {
          name:
            typeof colors[colorKey] === 'object'
              ? `bg-${colorKey}-500`
              : `bg-${colorKey}`,
          value: colorKey,
        };
      });
    return colorsList;
  }

  setIconList() {
    this.iconList = Object.values(IconList).map(
      (icon: IconList.IconDefinition) => {
        return icon.iconName;
      }
    );

    this.iconList = [
      ...this.iconList,
      ...Object.values(SolidIconList).map((icon: IconList.IconDefinition) => {
        return icon.iconName;
      }),
    ];

    this.iconList = this.iconList.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
  }

  get getCurrentColor() {
    return {
      name: `bg-${this.args.options.model?.backgroundColor}-500`,
      value: this.args.options.model?.backgroundColor,
    };
  }

  @action
  setColor(color: { name: string; value: string }) {
    if (this.getModel?.backgroundColor) {
      this.getModel.backgroundColor = color.value;
    }
  }

  @action
  saveCategory() {
    this.isLoading = true;
    this.args.options.model?.save().then(() => {
      this.isLoading = false;
      this.onSuccess();
    });
  }
}
